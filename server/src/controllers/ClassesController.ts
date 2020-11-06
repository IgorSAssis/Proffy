import { Request, Response } from "express";

import database from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

type ScheduleItem = {
    week_day: number;
    from: string;
    to: string;
}

export default class {

    async index(request: Request, response: Response) {

        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: "Missing filters to search classes"
            });
        }

        const timeInMinutes = convertHourToMinutes(time)

        const classes = await database("classes")
            .whereExists(function () {
                this.select("class_schedule.*")
                    .from("class_schedule")
                    .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
                    .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
                    .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
                    .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes])
            })
            .where("classes.subject", "=", subject)
            .join("users", "classes.user_id", "=", "users.id")
            .select("classes.*", "users.*")


        return response.json(classes);
    }

    async create(request: Request, response: Response) {

        const {
            user_id,
            subject,
            cost,
            schedule
        } = request.body;

        const transaction = await database.transaction()

        try {
            const insertedClassesId = await transaction("classes").insert({
                subject,
                cost,
                user_id
            });
            const class_id = insertedClassesId[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            });

            await transaction("class_schedule").insert(classSchedule);
            await transaction.commit();
            return response.status(201).send();

        } catch (err) {
            transaction.rollback();
            console.warn(err);
            return response.status(400).json({
                error: "Unexpected error while creating new class"
            })
        }
    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const classes = await database("classes")
            .select("classes.subject", "classes.cost", "class_schedule.week_day", "class_schedule.from", "class_schedule.to")
            .join("class_schedule","classes.id", "class_schedule.class_id")
            .where("classes.user_id", "=", id);

        if(classes.length === 0) {
            return response.status(400).json({ message: "This user does not have any class." })
        }

        return response.json(classes).status(200).send();
    }
}
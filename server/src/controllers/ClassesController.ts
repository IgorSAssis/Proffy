import { Request, Response } from "express";

import database from "@database/connection";
import convertHourToMinutes from "@utils/convertHourToMinutes";

type ClassTemplate = {
    id: number;
    avatar: string;
    name: string;
    surname: string;
    bio: string;
    subject: string;
    cost: number;
    scheduleItems: Array<{
        week_day: number;
        from: string;
        to: string;
    }>;
}

type ScheduleItem = {
    user_id: number;
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

        const scheduleItemsArr: Array<ScheduleItem> = [];
        const userProfileData: Array<ClassTemplate> = [];

        let classes = [];

        if (!filters.week_day && !filters.subject && !filters.time) {

            classes = await database("classes")
                .select("users.id",
                    "users.name",
                    "users.surname",
                    "users.avatar",
                    "users.bio",
                    "classes.subject",
                    "classes.cost",
                    "class_schedule.week_day",
                    "class_schedule.from",
                    "class_schedule.to")
                .join("class_schedule", "classes.id", "class_schedule.class_id")
                .join("users", "classes.user_id", "=", "users.id");

        } else if (filters.week_day && filters.subject && filters.time) {

            const timeInMinutes = convertHourToMinutes(time);
            
            classes = await database("classes")
                .select("users.id",
                    "users.name",
                    "users.surname",
                    "users.avatar",
                    "users.bio",
                    "classes.subject",
                    "classes.cost",
                    "class_schedule.week_day",
                    "class_schedule.from",
                    "class_schedule.to")
                .join("class_schedule", "classes.id", "class_schedule.class_id")
                .join("users", "classes.user_id", "=", "users.id")
                .where("class_schedule.week_day", "=", [Number(week_day)])
                .andWhere("classes.subject", "=", subject)
                .andWhere("class_schedule.from", "<=", [timeInMinutes])
                .andWhere("class_schedule.to", ">", [timeInMinutes]);

        } else {

            return response.status(400).json({ message: "Missing filters to search classes" }).send();

        }

        classes.forEach((item: any, index, arr) => {

            if (index === 0 || item.id !== arr[index - 1].id) {

                userProfileData.push({
                    id: item.id,
                    avatar: item.avatar,
                    name: item.name,
                    surname: item.surname,
                    bio: item.bio,
                    subject: item.subject,
                    cost: item.cost,
                    scheduleItems: []
                });

            }

            scheduleItemsArr.push({
                user_id: item.id,
                week_day: item.week_day,
                from: item.from,
                to: item.to
            });

        });

        for (let i = 0; i < userProfileData.length; i++) {

            for (let ii = 0; ii < scheduleItemsArr.length; ii++) {

                if (userProfileData[i].id === scheduleItemsArr[ii].user_id) {

                    userProfileData[i].scheduleItems.push({
                        week_day: scheduleItemsArr[ii].week_day,
                        from: scheduleItemsArr[ii].from,
                        to: scheduleItemsArr[ii].to
                    });

                }

            }

        }

        return response.status(200).json(userProfileData).send();

    }

    async create(request: Request, response: Response) {

        const {
            user_id,
            subject,
            cost,
            schedule
        } = request.body;

        const transaction = await database.transaction();

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
            return response.status(400).json({ error: "Unexpected error while creating new class" });

        }

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const classes = await database("classes")
            .select("classes.subject", "classes.cost", "class_schedule.week_day", "class_schedule.from", "class_schedule.to")
            .join("class_schedule", "classes.id", "class_schedule.class_id")
            .where("classes.user_id", "=", id);

        return response.json(classes).status(200).send();

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const deletedItem = await database("classes")
            .where("classes.user_id", "=", id)
            .returning("id")
            .del();

        if (!deletedItem) {

            return response.status(400).send();

        }

        return response.status(200).send();

    }

}

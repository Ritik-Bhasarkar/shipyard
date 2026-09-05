import { prisma } from "db/client";

export function createSection(sectionTitle: string, boardId: string) {
    return prisma.section.create({
        data: {
            sectionTitle,
            boardId,
        },
    });
}

export function getSections() {
    return prisma.section.findMany({
        orderBy: {
            sectionTitle: "asc",
        },
    });
}

export function getSectionById(sectionId: string) {
    return prisma.section.findUnique({
        where: {
            sectionId,
        },
    });
}

export function updateSection(sectionId: string, sectionTitle?: string) {
    return prisma.section.update({
        where: {
            sectionId,
        },
        data: sectionTitle === undefined ? {} : { sectionTitle },
    });
}

export function deleteSection(sectionId: string) {
    return prisma.section.delete({
        where: {
            sectionId,
        },
    });
}

export const TasksStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
  IN_REVIEW: "IN_REVIEW",
} as const;

export const TasksPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type TasksStatusEnumType = keyof typeof TasksStatusEnum;
export type TasksPriorityEnumType = keyof typeof TasksPriorityEnum;

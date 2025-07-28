import {
  TasksPriorityEnum,
  TasksStatusEnum,
  TasksStatusEnumType,
} from "./../enums/tasks.enum";
import mongoose, { Schema, model, Document } from "mongoose";
import { TasksPriorityEnumType } from "../enums/tasks.enum";
import { generateUUID } from "../utils/uuid";

export interface TaskDocument extends Document {
  taskCode: string;
  title: string;
  description?: string | null;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  status: TasksStatusEnumType;
  priority: TasksPriorityEnumType;
  assignedTo: mongoose.Types.ObjectId | null;
  createdBy: mongoose.Types.ObjectId;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    taskCode: { type: String, default: generateUUID, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TasksStatusEnum),
      default: TasksStatusEnum.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(TasksPriorityEnum),
      default: TasksPriorityEnum.MEDIUM,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: { type: Date, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<TaskDocument>("Task", taskSchema);
export default TaskModel;

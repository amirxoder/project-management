import mongoose, { Schema, model, Document } from "mongoose";
import {
  TasksPriorityEnumType,
  TasksStatusEnumType,
} from "../enums/tasks.enum";

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

import { CourseDocuments } from "@prisma/client";
import { BaseOption } from "./user";

export interface courseDocumentSlice {
  courseDocuments: CourseDocuments[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewCourseDocumentPayload extends BaseOption {
  courseId: string;
  documentId: string;
}
export interface UpdateCourseDocumentPayload
  extends BaseOption,
    NewCourseDocumentPayload {
  id: string;
}
export interface DeleteCourseDocumentPayload extends BaseOption {
  id: string;
}

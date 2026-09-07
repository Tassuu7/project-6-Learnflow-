/**
 * LearnFlow Type Definitions
 * Strict 3-role architecture: Student, Faculty (Instructor), and Administrator
 * Offline-first capabilities, video chapter explanations, and local subject AI
 */

export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  title?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  lastLogin?: string;
  bio?: string;
}

export type Permission =
  | 'COURSE_VIEW'
  | 'COURSE_CREATE'
  | 'COURSE_EDIT'
  | 'COURSE_DELETE'
  | 'COURSE_APPROVE'
  | 'QUIZ_CREATE'
  | 'QUIZ_ATTEMPT'
  | 'QUIZ_GRADE'
  | 'ASSIGNMENT_CREATE'
  | 'ASSIGNMENT_SUBMIT'
  | 'ASSIGNMENT_GRADE'
  | 'USER_VIEW'
  | 'USER_CREATE'
  | 'USER_EDIT'
  | 'USER_DELETE'
  | 'ANALYTICS_VIEW'
  | 'REPORT_VIEW'
  | 'SYSTEM_SETTINGS'
  | 'AUDIT_VIEW'
  | 'OFFLINE_DOWNLOAD'
  | 'OFFLINE_SYNC';

export type CourseStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type MaterialType = 'TEXT' | 'PDF' | 'VIDEO' | 'PRESENTATION';

export interface LearningMaterial {
  id: string;
  title: string;
  type: MaterialType;
  content: string; // Text content, transcript, or document text
  resourceUrl?: string;
  durationMinutes: number;
  fileSizeMb?: number;
  isDownloadable: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  order: number;
  durationMinutes: number;
  videoUrl?: string; // Chapter/Lesson explanation video link provided by faculty
  materials: LearningMaterial[];
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  videoUrl?: string; // Chapter overview video link
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  chapters: Chapter[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: string;
  subject: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedHours: number;
  thumbnailUrl?: string;
  status: CourseStatus;
  modules: Module[];
  prerequisites: string[];
  learningObjectives: string[];
  isOfflineAvailable: boolean;
  packageSizeMb: number;
  createdAt: string;
  updatedAt: string;
  reviewNotes?: string;
  tags: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedLessons: string[]; // lessonIds
  completedAt?: string;
  lastAccessedAt: string;
  timeSpentMinutes: number;
  isDownloadedOffline: boolean;
  scorePercentage?: number;
  facultyFeedback?: string;
}

export type QuestionType =
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_ANSWER'
  | 'TRUE_FALSE'
  | 'FILL_BLANK';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswers: number[]; // Index of correct option(s) or [0/1] for TF
  correctTextAnswer?: string; // For fill in blank
  explanation: string;
  topicTag: string; // Used for weak-topic detection
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScorePercentage: number;
  maxAttempts: number;
  questions: Question[];
  isOfflinePermitted: boolean;
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startedAt: string;
  submittedAt: string;
  scorePercentage: number;
  totalPoints: number;
  earnedPoints: number;
  passed: boolean;
  userAnswers: Record<string, any>; // questionId -> answer
  isSyncedFromOffline: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxScore: number;
  rubric: { criterion: string; points: number }[];
  isOfflinePermitted: boolean;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  attachmentName?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'GRADED' | 'RETURNED';
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  scorePercentage: number;
}

export interface CourseDiscussion {
  id: string;
  courseId: string;
  lessonId?: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  question: string;
  replies: {
    id: string;
    userId: string;
    userName: string;
    userRole: UserRole;
    text: string;
    createdAt: string;
    isInstructorEndorsed?: boolean;
  }[];
  createdAt: string;
  isPinned?: boolean;
}

export interface StudentDoubt {
  id: string;
  courseId: string;
  courseTitle: string;
  chapterTitle?: string;
  studentId: string;
  studentName: string;
  facultyId: string;
  facultyName: string;
  question: string;
  codeSnippet?: string;
  status: 'PENDING' | 'RESOLVED';
  answer?: string;
  answeredAt?: string;
  createdAt: string;
}

export interface StudentNote {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  content: string;
  updatedAt: string;
}

export interface StudentBookmark {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  createdAt: string;
}

export type SyncEventType =
  | 'LESSON_COMPLETED'
  | 'BOOKMARK_ADDED'
  | 'NOTE_CREATED'
  | 'PROGRESS_UPDATED'
  | 'QUIZ_SUBMITTED'
  | 'ASSIGNMENT_SUBMITTED';

export interface SyncEvent {
  eventId: string;
  userId: string;
  eventType: SyncEventType;
  entityId: string;
  timestamp: string;
  payload: any;
  clientVersion: string;
  syncStatus: 'PENDING' | 'SYNCED' | 'FAILED' | 'CONFLICT_RESOLVED';
  retryCount: number;
  errorMessage?: string;
}

export interface OfflinePackage {
  courseId: string;
  courseTitle: string;
  version: number;
  sizeMb: number;
  downloadedAt: string;
  lastSyncedAt: string;
  storageKey: string;
  pendingSyncCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string; // or 'ALL'
  targetRole?: UserRole;
  title: string;
  message: string;
  type: 'COURSE' | 'ASSESSMENT' | 'CERTIFICATE' | 'SYSTEM' | 'SYNC';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entity: string;
  entityId: string;
  result: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
}

export interface MLModelInfo {
  id: string;
  name: string;
  type: 'RECOMMENDER' | 'WEAK_TOPIC_DETECTOR' | 'DISENGAGEMENT_PREDICTOR' | 'KNOWLEDGE_RETRIEVER';
  algorithm: string;
  version: string;
  trainingDate: string;
  datasetVersion: string;
  featureCount: number;
  accuracy: number;
  f1Score: number;
  status: 'ACTIVE' | 'TRAINING' | 'STANDBY';
  deploymentStatus: 'PRODUCTION_LOCAL';
}

export interface WeakTopicAnalysis {
  topic: string;
  proficiency: 'STRONG' | 'MODERATE' | 'NEEDS_PRACTICE';
  correctCount: number;
  totalCount: number;
  percentage: number;
  recommendationNote: string;
}

export interface DisengagementIndicator {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number; // 0 - 100 risk score
  reasons: string[];
  lastActiveDaysAgo: number;
}

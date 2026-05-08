import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AddCommentBody, Comment, CreateDiaryEntryBody, CreateMemoryBody, CreateMilestoneBody, DiaryEntry, ErrorEnvelope, HealthStatus, ListMemoriesParams, Memory, MemoryList, Milestone, Profile, RecentActivity, Stats, UpdateMemoryBody, UpdateProfileBody, UploadUrlRequest, UploadUrlResponse } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get child profile
 */
export declare const getGetProfileUrl: () => string;
export declare const getProfile: (options?: RequestInit) => Promise<Profile>;
export declare const getGetProfileQueryKey: () => readonly ["/api/profile"];
export declare const getGetProfileQueryOptions: <TData = Awaited<ReturnType<typeof getProfile>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProfile>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProfileQueryResult = NonNullable<Awaited<ReturnType<typeof getProfile>>>;
export type GetProfileQueryError = ErrorType<unknown>;
/**
 * @summary Get child profile
 */
export declare function useGetProfile<TData = Awaited<ReturnType<typeof getProfile>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update child profile
 */
export declare const getUpdateProfileUrl: () => string;
export declare const updateProfile: (updateProfileBody: UpdateProfileBody, options?: RequestInit) => Promise<Profile>;
export declare const getUpdateProfileMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProfile>>, TError, {
        data: BodyType<UpdateProfileBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateProfile>>, TError, {
    data: BodyType<UpdateProfileBody>;
}, TContext>;
export type UpdateProfileMutationResult = NonNullable<Awaited<ReturnType<typeof updateProfile>>>;
export type UpdateProfileMutationBody = BodyType<UpdateProfileBody>;
export type UpdateProfileMutationError = ErrorType<unknown>;
/**
 * @summary Update child profile
 */
export declare const useUpdateProfile: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateProfile>>, TError, {
        data: BodyType<UpdateProfileBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateProfile>>, TError, {
    data: BodyType<UpdateProfileBody>;
}, TContext>;
/**
 * @summary List all memories
 */
export declare const getListMemoriesUrl: (params?: ListMemoriesParams) => string;
export declare const listMemories: (params?: ListMemoriesParams, options?: RequestInit) => Promise<MemoryList>;
export declare const getListMemoriesQueryKey: (params?: ListMemoriesParams) => readonly ["/api/memories", ...ListMemoriesParams[]];
export declare const getListMemoriesQueryOptions: <TData = Awaited<ReturnType<typeof listMemories>>, TError = ErrorType<unknown>>(params?: ListMemoriesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMemories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMemories>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMemoriesQueryResult = NonNullable<Awaited<ReturnType<typeof listMemories>>>;
export type ListMemoriesQueryError = ErrorType<unknown>;
/**
 * @summary List all memories
 */
export declare function useListMemories<TData = Awaited<ReturnType<typeof listMemories>>, TError = ErrorType<unknown>>(params?: ListMemoriesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMemories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new memory
 */
export declare const getCreateMemoryUrl: () => string;
export declare const createMemory: (createMemoryBody: CreateMemoryBody, options?: RequestInit) => Promise<Memory>;
export declare const getCreateMemoryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMemory>>, TError, {
        data: BodyType<CreateMemoryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMemory>>, TError, {
    data: BodyType<CreateMemoryBody>;
}, TContext>;
export type CreateMemoryMutationResult = NonNullable<Awaited<ReturnType<typeof createMemory>>>;
export type CreateMemoryMutationBody = BodyType<CreateMemoryBody>;
export type CreateMemoryMutationError = ErrorType<unknown>;
/**
 * @summary Create a new memory
 */
export declare const useCreateMemory: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMemory>>, TError, {
        data: BodyType<CreateMemoryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMemory>>, TError, {
    data: BodyType<CreateMemoryBody>;
}, TContext>;
/**
 * @summary Get a specific memory
 */
export declare const getGetMemoryUrl: (id: number) => string;
export declare const getMemory: (id: number, options?: RequestInit) => Promise<Memory>;
export declare const getGetMemoryQueryKey: (id: number) => readonly [`/api/memories/${number}`];
export declare const getGetMemoryQueryOptions: <TData = Awaited<ReturnType<typeof getMemory>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMemory>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMemory>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMemoryQueryResult = NonNullable<Awaited<ReturnType<typeof getMemory>>>;
export type GetMemoryQueryError = ErrorType<unknown>;
/**
 * @summary Get a specific memory
 */
export declare function useGetMemory<TData = Awaited<ReturnType<typeof getMemory>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMemory>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a memory
 */
export declare const getUpdateMemoryUrl: (id: number) => string;
export declare const updateMemory: (id: number, updateMemoryBody: UpdateMemoryBody, options?: RequestInit) => Promise<Memory>;
export declare const getUpdateMemoryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMemory>>, TError, {
        id: number;
        data: BodyType<UpdateMemoryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMemory>>, TError, {
    id: number;
    data: BodyType<UpdateMemoryBody>;
}, TContext>;
export type UpdateMemoryMutationResult = NonNullable<Awaited<ReturnType<typeof updateMemory>>>;
export type UpdateMemoryMutationBody = BodyType<UpdateMemoryBody>;
export type UpdateMemoryMutationError = ErrorType<unknown>;
/**
 * @summary Update a memory
 */
export declare const useUpdateMemory: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMemory>>, TError, {
        id: number;
        data: BodyType<UpdateMemoryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMemory>>, TError, {
    id: number;
    data: BodyType<UpdateMemoryBody>;
}, TContext>;
/**
 * @summary Delete a memory
 */
export declare const getDeleteMemoryUrl: (id: number) => string;
export declare const deleteMemory: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteMemoryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMemory>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteMemory>>, TError, {
    id: number;
}, TContext>;
export type DeleteMemoryMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMemory>>>;
export type DeleteMemoryMutationError = ErrorType<unknown>;
/**
 * @summary Delete a memory
 */
export declare const useDeleteMemory: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMemory>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteMemory>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Toggle like on a memory
 */
export declare const getLikeMemoryUrl: (id: number) => string;
export declare const likeMemory: (id: number, options?: RequestInit) => Promise<Memory>;
export declare const getLikeMemoryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeMemory>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof likeMemory>>, TError, {
    id: number;
}, TContext>;
export type LikeMemoryMutationResult = NonNullable<Awaited<ReturnType<typeof likeMemory>>>;
export type LikeMemoryMutationError = ErrorType<unknown>;
/**
 * @summary Toggle like on a memory
 */
export declare const useLikeMemory: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeMemory>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof likeMemory>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List comments for a memory
 */
export declare const getListCommentsUrl: (id: number) => string;
export declare const listComments: (id: number, options?: RequestInit) => Promise<Comment[]>;
export declare const getListCommentsQueryKey: (id: number) => readonly [`/api/memories/${number}/comments`];
export declare const getListCommentsQueryOptions: <TData = Awaited<ReturnType<typeof listComments>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listComments>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listComments>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCommentsQueryResult = NonNullable<Awaited<ReturnType<typeof listComments>>>;
export type ListCommentsQueryError = ErrorType<unknown>;
/**
 * @summary List comments for a memory
 */
export declare function useListComments<TData = Awaited<ReturnType<typeof listComments>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listComments>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add a comment to a memory
 */
export declare const getAddCommentUrl: (id: number) => string;
export declare const addComment: (id: number, addCommentBody: AddCommentBody, options?: RequestInit) => Promise<Comment>;
export declare const getAddCommentMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addComment>>, TError, {
        id: number;
        data: BodyType<AddCommentBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addComment>>, TError, {
    id: number;
    data: BodyType<AddCommentBody>;
}, TContext>;
export type AddCommentMutationResult = NonNullable<Awaited<ReturnType<typeof addComment>>>;
export type AddCommentMutationBody = BodyType<AddCommentBody>;
export type AddCommentMutationError = ErrorType<unknown>;
/**
 * @summary Add a comment to a memory
 */
export declare const useAddComment: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addComment>>, TError, {
        id: number;
        data: BodyType<AddCommentBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addComment>>, TError, {
    id: number;
    data: BodyType<AddCommentBody>;
}, TContext>;
/**
 * @summary List all diary entries
 */
export declare const getListDiaryEntriesUrl: () => string;
export declare const listDiaryEntries: (options?: RequestInit) => Promise<DiaryEntry[]>;
export declare const getListDiaryEntriesQueryKey: () => readonly ["/api/diary"];
export declare const getListDiaryEntriesQueryOptions: <TData = Awaited<ReturnType<typeof listDiaryEntries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDiaryEntries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listDiaryEntries>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListDiaryEntriesQueryResult = NonNullable<Awaited<ReturnType<typeof listDiaryEntries>>>;
export type ListDiaryEntriesQueryError = ErrorType<unknown>;
/**
 * @summary List all diary entries
 */
export declare function useListDiaryEntries<TData = Awaited<ReturnType<typeof listDiaryEntries>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDiaryEntries>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new diary entry
 */
export declare const getCreateDiaryEntryUrl: () => string;
export declare const createDiaryEntry: (createDiaryEntryBody: CreateDiaryEntryBody, options?: RequestInit) => Promise<DiaryEntry>;
export declare const getCreateDiaryEntryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
        data: BodyType<CreateDiaryEntryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
    data: BodyType<CreateDiaryEntryBody>;
}, TContext>;
export type CreateDiaryEntryMutationResult = NonNullable<Awaited<ReturnType<typeof createDiaryEntry>>>;
export type CreateDiaryEntryMutationBody = BodyType<CreateDiaryEntryBody>;
export type CreateDiaryEntryMutationError = ErrorType<unknown>;
/**
 * @summary Create a new diary entry
 */
export declare const useCreateDiaryEntry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
        data: BodyType<CreateDiaryEntryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createDiaryEntry>>, TError, {
    data: BodyType<CreateDiaryEntryBody>;
}, TContext>;
/**
 * @summary Get a specific diary entry
 */
export declare const getGetDiaryEntryUrl: (id: number) => string;
export declare const getDiaryEntry: (id: number, options?: RequestInit) => Promise<DiaryEntry>;
export declare const getGetDiaryEntryQueryKey: (id: number) => readonly [`/api/diary/${number}`];
export declare const getGetDiaryEntryQueryOptions: <TData = Awaited<ReturnType<typeof getDiaryEntry>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDiaryEntry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDiaryEntry>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDiaryEntryQueryResult = NonNullable<Awaited<ReturnType<typeof getDiaryEntry>>>;
export type GetDiaryEntryQueryError = ErrorType<unknown>;
/**
 * @summary Get a specific diary entry
 */
export declare function useGetDiaryEntry<TData = Awaited<ReturnType<typeof getDiaryEntry>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDiaryEntry>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a diary entry
 */
export declare const getUpdateDiaryEntryUrl: (id: number) => string;
export declare const updateDiaryEntry: (id: number, createDiaryEntryBody: CreateDiaryEntryBody, options?: RequestInit) => Promise<DiaryEntry>;
export declare const getUpdateDiaryEntryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateDiaryEntry>>, TError, {
        id: number;
        data: BodyType<CreateDiaryEntryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateDiaryEntry>>, TError, {
    id: number;
    data: BodyType<CreateDiaryEntryBody>;
}, TContext>;
export type UpdateDiaryEntryMutationResult = NonNullable<Awaited<ReturnType<typeof updateDiaryEntry>>>;
export type UpdateDiaryEntryMutationBody = BodyType<CreateDiaryEntryBody>;
export type UpdateDiaryEntryMutationError = ErrorType<unknown>;
/**
 * @summary Update a diary entry
 */
export declare const useUpdateDiaryEntry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateDiaryEntry>>, TError, {
        id: number;
        data: BodyType<CreateDiaryEntryBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateDiaryEntry>>, TError, {
    id: number;
    data: BodyType<CreateDiaryEntryBody>;
}, TContext>;
/**
 * @summary Delete a diary entry
 */
export declare const getDeleteDiaryEntryUrl: (id: number) => string;
export declare const deleteDiaryEntry: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteDiaryEntryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
    id: number;
}, TContext>;
export type DeleteDiaryEntryMutationResult = NonNullable<Awaited<ReturnType<typeof deleteDiaryEntry>>>;
export type DeleteDiaryEntryMutationError = ErrorType<unknown>;
/**
 * @summary Delete a diary entry
 */
export declare const useDeleteDiaryEntry: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteDiaryEntry>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all milestones
 */
export declare const getListMilestonesUrl: () => string;
export declare const listMilestones: (options?: RequestInit) => Promise<Milestone[]>;
export declare const getListMilestonesQueryKey: () => readonly ["/api/milestones"];
export declare const getListMilestonesQueryOptions: <TData = Awaited<ReturnType<typeof listMilestones>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMilestones>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMilestones>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMilestonesQueryResult = NonNullable<Awaited<ReturnType<typeof listMilestones>>>;
export type ListMilestonesQueryError = ErrorType<unknown>;
/**
 * @summary List all milestones
 */
export declare function useListMilestones<TData = Awaited<ReturnType<typeof listMilestones>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMilestones>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new milestone
 */
export declare const getCreateMilestoneUrl: () => string;
export declare const createMilestone: (createMilestoneBody: CreateMilestoneBody, options?: RequestInit) => Promise<Milestone>;
export declare const getCreateMilestoneMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMilestone>>, TError, {
        data: BodyType<CreateMilestoneBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMilestone>>, TError, {
    data: BodyType<CreateMilestoneBody>;
}, TContext>;
export type CreateMilestoneMutationResult = NonNullable<Awaited<ReturnType<typeof createMilestone>>>;
export type CreateMilestoneMutationBody = BodyType<CreateMilestoneBody>;
export type CreateMilestoneMutationError = ErrorType<unknown>;
/**
 * @summary Create a new milestone
 */
export declare const useCreateMilestone: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMilestone>>, TError, {
        data: BodyType<CreateMilestoneBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMilestone>>, TError, {
    data: BodyType<CreateMilestoneBody>;
}, TContext>;
/**
 * @summary Update a milestone
 */
export declare const getUpdateMilestoneUrl: (id: number) => string;
export declare const updateMilestone: (id: number, createMilestoneBody: CreateMilestoneBody, options?: RequestInit) => Promise<Milestone>;
export declare const getUpdateMilestoneMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMilestone>>, TError, {
        id: number;
        data: BodyType<CreateMilestoneBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMilestone>>, TError, {
    id: number;
    data: BodyType<CreateMilestoneBody>;
}, TContext>;
export type UpdateMilestoneMutationResult = NonNullable<Awaited<ReturnType<typeof updateMilestone>>>;
export type UpdateMilestoneMutationBody = BodyType<CreateMilestoneBody>;
export type UpdateMilestoneMutationError = ErrorType<unknown>;
/**
 * @summary Update a milestone
 */
export declare const useUpdateMilestone: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMilestone>>, TError, {
        id: number;
        data: BodyType<CreateMilestoneBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMilestone>>, TError, {
    id: number;
    data: BodyType<CreateMilestoneBody>;
}, TContext>;
/**
 * @summary Delete a milestone
 */
export declare const getDeleteMilestoneUrl: (id: number) => string;
export declare const deleteMilestone: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteMilestoneMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMilestone>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteMilestone>>, TError, {
    id: number;
}, TContext>;
export type DeleteMilestoneMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMilestone>>>;
export type DeleteMilestoneMutationError = ErrorType<unknown>;
/**
 * @summary Delete a milestone
 */
export declare const useDeleteMilestone: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMilestone>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteMilestone>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get summary stats for the blog
 */
export declare const getGetStatsUrl: () => string;
export declare const getStats: (options?: RequestInit) => Promise<Stats>;
export declare const getGetStatsQueryKey: () => readonly ["/api/stats"];
export declare const getGetStatsQueryOptions: <TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getStats>>>;
export type GetStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get summary stats for the blog
 */
export declare function useGetStats<TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get recent memories and diary entries
 */
export declare const getGetRecentActivityUrl: () => string;
export declare const getRecentActivity: (options?: RequestInit) => Promise<RecentActivity>;
export declare const getGetRecentActivityQueryKey: () => readonly ["/api/recent"];
export declare const getGetRecentActivityQueryOptions: <TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRecentActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getRecentActivity>>>;
export type GetRecentActivityQueryError = ErrorType<unknown>;
/**
 * @summary Get recent memories and diary entries
 */
export declare function useGetRecentActivity<TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Request a presigned URL for file upload
 */
export declare const getRequestUploadUrlUrl: () => string;
export declare const requestUploadUrl: (uploadUrlRequest: UploadUrlRequest, options?: RequestInit) => Promise<UploadUrlResponse>;
export declare const getRequestUploadUrlMutationOptions: <TError = ErrorType<ErrorEnvelope>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
export type RequestUploadUrlMutationResult = NonNullable<Awaited<ReturnType<typeof requestUploadUrl>>>;
export type RequestUploadUrlMutationBody = BodyType<UploadUrlRequest>;
export type RequestUploadUrlMutationError = ErrorType<ErrorEnvelope>;
/**
 * @summary Request a presigned URL for file upload
 */
export declare const useRequestUploadUrl: <TError = ErrorType<ErrorEnvelope>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
/**
 * @summary Serve a public asset from PUBLIC_OBJECT_SEARCH_PATHS
 */
export declare const getGetPublicObjectUrl: (filePath: string) => string;
export declare const getPublicObject: (filePath: string, options?: RequestInit) => Promise<Blob>;
export declare const getGetPublicObjectQueryKey: (filePath: string) => readonly [`/api/storage/public-objects/${string}`];
export declare const getGetPublicObjectQueryOptions: <TData = Awaited<ReturnType<typeof getPublicObject>>, TError = ErrorType<ErrorEnvelope>>(filePath: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPublicObject>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPublicObject>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPublicObjectQueryResult = NonNullable<Awaited<ReturnType<typeof getPublicObject>>>;
export type GetPublicObjectQueryError = ErrorType<ErrorEnvelope>;
/**
 * @summary Serve a public asset from PUBLIC_OBJECT_SEARCH_PATHS
 */
export declare function useGetPublicObject<TData = Awaited<ReturnType<typeof getPublicObject>>, TError = ErrorType<ErrorEnvelope>>(filePath: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPublicObject>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Serve an object entity from PRIVATE_OBJECT_DIR
 */
export declare const getGetStorageObjectUrl: (objectPath: string) => string;
export declare const getStorageObject: (objectPath: string, options?: RequestInit) => Promise<Blob>;
export declare const getGetStorageObjectQueryKey: (objectPath: string) => readonly [`/api/storage/objects/${string}`];
export declare const getGetStorageObjectQueryOptions: <TData = Awaited<ReturnType<typeof getStorageObject>>, TError = ErrorType<ErrorEnvelope>>(objectPath: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStorageObject>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStorageObject>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStorageObjectQueryResult = NonNullable<Awaited<ReturnType<typeof getStorageObject>>>;
export type GetStorageObjectQueryError = ErrorType<ErrorEnvelope>;
/**
 * @summary Serve an object entity from PRIVATE_OBJECT_DIR
 */
export declare function useGetStorageObject<TData = Awaited<ReturnType<typeof getStorageObject>>, TError = ErrorType<ErrorEnvelope>>(objectPath: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStorageObject>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map
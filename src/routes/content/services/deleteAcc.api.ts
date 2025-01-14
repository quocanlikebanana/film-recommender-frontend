import protectedApi from "./protectedApi";

const deleteAccApi = protectedApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteAcc: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/delete',
                method: 'DELETE',
            })
        }),
    }),
    overrideExisting: true,
});

export default deleteAccApi;
export const { useDeleteAccMutation } = deleteAccApi;
import protectedApi from "./protectedApi";

const logoutApi = protectedApi.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            })
        }),
    }),
    overrideExisting: true,
});

export default logoutApi;
export const { useLogoutMutation } = logoutApi;
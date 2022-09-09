import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type PostsType = {
	userId: number
	id: number
	title: string
	body: string
}

export const jsonApi = createApi({
	reducerPath: 'jsonApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000'
	}),
	tagTypes: ['Post'],
	endpoints: (builder) => ({
		getPosts: builder.query<number[], void>({
			query: () => '/posts',
			transformResponse: (response: PostsType[]) =>
				response.map((post) => post.id),
			providesTags: (ids) =>
				ids
					? [
							...ids.map((id) => ({ type: 'Post' as const, id })),
							{ type: 'Post', id: 'all' }
					  ]
					: [{ type: 'Post', id: 'all' }]
		}),
		getPostById: builder.query<PostsType, number>({
			query: (id) => `posts/${id}`,
			providesTags: (post) => [{ type: 'Post', id: post?.id }]
		}),
		addPost: builder.mutation<PostsType, string>({
			query: (body) => ({
				url: '/posts',
				method: 'POST',
				body,
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			}),
			invalidatesTags: () => [{ type: 'Post', id: 'all' }]
		})
	})
})

export const { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation } =
	jsonApi

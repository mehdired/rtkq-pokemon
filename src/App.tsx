import {
	useGetPostsQuery,
	useGetPostByIdQuery,
	PostsType,
	useAddPostMutation
} from './api/api'

type PostsProps = {
	id: number
}

const newPost: PostsType = {
	userId: 1,
	id: 99999,
	title: 'test',
	body: 'add post'
}

const Button = () => {
	const [addPost, { isSuccess: hasAdded }] = useAddPostMutation()

	const handleClick = () => {
		addPost(JSON.stringify(newPost))
	}

	return <button onClick={handleClick}>Add Post</button>
}

const PostItem = ({ id }: PostsProps) => {
	const { data: post } = useGetPostByIdQuery(id, { skip: !id })

	return <li>{post?.title}</li>
}

function App() {
	const { data: postId, isLoading } = useGetPostsQuery()

	if (isLoading) return <div>...Loading</div>

	return (
		<>
			<Button />
			<ul>
				{postId?.map((id) => (
					<PostItem id={id} />
				))}
			</ul>
		</>
	)
}

export default App

import { GithubSpark } from 'src/features/github-spark/GithubSpark'

const GithubSparkPage = () => {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-semibold">GitHub Spark</h1>
            <GithubSpark />
        </div>
    )
}

export default GithubSparkPage

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.inProgress,
    repositoriesList: [],
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)

    try {
      const data = await response.json()
      if (response.ok) {
        const fetchedData = data.popular_repos.map(eachRepo => ({
          name: eachRepo.name,
          id: eachRepo.id,
          issuesCount: eachRepo.issues_count,
          forksCount: eachRepo.forks_count,
          starsCount: eachRepo.stars_count,
          avatarUrl: eachRepo.avatar_url,
        }))

        this.setState({
          repositoriesList: fetchedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getRepositories)
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoriesList = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repositories-container">
        {repositoriesList.map(each => (
          <RepositoryItem repositoryDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-content">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesContent = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      default:
        return this.renderFailureView()
    }
  }

  renderLanguagesContent = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="languages-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageDetails={eachLanguage}
            setActiveLanguageId={this.setActiveLanguageId}
            isActive={eachLanguage.id === activeLanguageId}
            key={eachLanguage.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="popular-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguagesContent()}
        {this.renderRepositoriesContent()}
      </div>
    )
  }
}

export default GithubPopularRepos

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    languagesList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguages()
  }

  updateTabId = newTabId => {
    this.setState({activeTabId: newTabId}, this.getLanguages)
  }

  getLanguages = async () => {
    const {activeTabId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeTabId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.popular_repos.map(eachLanguage => ({
        avatarUrl: eachLanguage.avatar_url,
        id: eachLanguage.id,
        name: eachLanguage.name,
        issuesCount: eachLanguage.issues_count,
        forksCount: eachLanguage.forks_count,
        starsCount: eachLanguage.stars_count,
      }))
      this.setState({
        languagesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFilteredListItem = () => {
    const {languagesList} = this.state
    return (
      <ul className="languages-list">
        {languagesList.map(eachLanguage => (
          <RepositoryItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
          />
        ))}
      </ul>
    )
  }

  renderFilteredTabs = () => {
    const {activeTabId} = this.state
    return (
      <ul className="tabs-list">
        {languageFiltersData.map(eachTab => (
          <LanguageFilterItem
            key={eachTab.id}
            tabDetails={eachTab}
            updateTabId={this.updateTabId}
            isActive={eachTab.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure">
      <img src="" alt="" className="not-found" />
      <h1 className="description">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFilteredList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFilteredListItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Popular</h1>
          {this.renderFilteredTabs()}
          {this.renderFilteredList()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos

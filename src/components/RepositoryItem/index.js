// Write your code here
// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {languageDetails} = props
  const {avatarUrl, name, issuesCount, forksCount, starsCount} = languageDetails
  return (
    <li className="language-item">
      <img src={avatarUrl} alt={name} className="logos" />
      <h1 className="title">{name}</h1>
      <div className="stars-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p className="values">{starsCount}</p>
      </div>
      <div className="stars-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        <p className="values">{forksCount}</p>
      </div>
      <div className="stars-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo"
        />
        <p className="values">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem

// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-list">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="heading">{name}</h1>
      <div className="list-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="detail-image"
        />
        <p className="repo-name">{starsCount} stars</p>
      </div>
      <div className="list-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="detail-image"
        />
        <p className="repo-name">{forksCount} forks</p>
      </div>
      <div className="list-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="detail-image"
        />
        <p className="repo-name">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

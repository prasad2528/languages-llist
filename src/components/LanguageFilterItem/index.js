import './index.css'

const LanguageFilterItem = props => {
  const {tabDetails, updateTabId, isActive} = props
  const {id, language} = tabDetails
  const buttonClassName = isActive ? 'active' : 'normal'
  const onClickTab = () => {
    updateTabId(id)
  }
  return (
    <li className="list-item">
      <button
        className={`button ${buttonClassName}`}
        type="button"
        onClick={onClickTab}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

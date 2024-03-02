// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setActiveLanguageId, isActive} = props
  const {language, id} = languageDetails
  const activeLanguage = isActive ? 'language-button active' : 'language-button'

  const onClickButton = () => {
    setActiveLanguageId(id)
  }

  return (
    <li className="list-element">
      <button className={activeLanguage} type="button" onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

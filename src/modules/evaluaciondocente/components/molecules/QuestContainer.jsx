import React from 'react'
import Dropdown from '../atoms/Dropdown'
import { TextContainer } from '../atoms/Styles'
import { Quest1, Quest2, Quest3, Quest4 } from '../atoms/Text'

const QuestContainer = () => {
  return (
    <>
    <TextContainer>{Quest1}</TextContainer>
    <Dropdown/>
    <TextContainer>{Quest2}</TextContainer>
    <Dropdown/>
    <TextContainer>{Quest3}</TextContainer>
    <Dropdown/>
    <TextContainer>{Quest4}</TextContainer>
    <Dropdown/>
    </>
  )
}

export default QuestContainer
import React, { memo, useState } from 'react'
import { useAsync } from 'react-async-hook'
import shortid from 'shortid'
import cache from 'localforage'
import {
  Dashboard,
  ItemArea,
  TypeTable,
  MonsterCard,
  MoveSet,
  MoveName,
  MonsterIcon,
  NameSet,
  MonsterName,
  Misc,
  MiscIcon,
  Ability,
  EmptyCard,
  MonsterAttributes,
  Background,
  Fill,
  LvlSVG,
  HapSVG,
  SpaSVG,
  SpdSVG,
  SpeSVG,
  DefSVG,
  AtkSVG,
  HpSVG,
  LvlLabel,
  HapLabel,
  SpaLabel,
  SpdLabel,
  SpeLabel,
  DefLabel,
  AtkLabel,
  HpLabel,
} from '../styles/Team'
import { types, sex } from '../lib/Asset'
import { NullCheck } from '../lib/Checker'
import { colors } from '../lib/Strings'
import pikachu from '../assets/pikachu.svg'

/** This is an array of 8 numbers that describes the fill percentage of each attribute of a pokemon */
type fillProportions = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

/**
 * Creates an attribute chart with a pie chart style. There are 8 pies, each representing an attribute. All pies have an equal width proportion, but different levels of fill. Fill level indicates how strong a particular attribute is.
 *
 * @param fillProportions: An array of 8 numebrs, each representing the level of fill of each attribute from 0 to 1.
 * @param fillColor: The color of the fill textures of the pie chart.
 *
 * @return octagon: The html of the pie chart.
 */
const makePie = (fillProportions: fillProportions, fillColor: string) => {
  const zip = (firstArray: any[], ...arrays: any[][]) => {
    return firstArray.map((firstItem, i) =>
      arrays.reduce((accumArray, curArray) => [...accumArray, curArray[i]], [
        firstItem,
      ])
    )
  }

  const svgs = [LvlSVG, HapSVG, SpaSVG, SpdSVG, SpeSVG, DefSVG, AtkSVG, HpSVG]
  const labels = [
    LvlLabel,
    HapLabel,
    SpaLabel,
    SpdLabel,
    SpeLabel,
    DefLabel,
    AtkLabel,
    HpLabel,
  ]
  const values = ['Lvl', 'Hap', 'Spa', 'Spd', 'Spe', 'Def', 'Atk', 'Hp']

  const pieAttributes = zip(svgs, fillProportions, labels)
  const labelAttributes = zip(labels, values)
  const backgroundStrokeWidth = 50
  const octagon = (
    <MonsterAttributes>
      {pieAttributes.map((attribute) => {
        const AttributeTexture = attribute[0]
        const strokeWidth = attribute[1] * backgroundStrokeWidth
        const radius = strokeWidth / 2
        const strokeDashArray = `${(Math.PI * radius) / 4} ${
          2 * Math.PI * radius
        }`

        return (
          <AttributeTexture width='100' height='100' key={shortid.generate()}>
            <Background
              r='25'
              cx='50'
              cy='50'
              strokeWidth={backgroundStrokeWidth}
              strokeDasharray='20 158'
            />
            <Fill
              strokeFill={fillColor}
              r={radius}
              cx='50'
              cy='50'
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDashArray}
            />
          </AttributeTexture>
        )
      })}
      {labelAttributes.map((attribute) => {
        const AttributeLabel = attribute[0]
        const label = attribute[1]

        return <AttributeLabel key={shortid.generate()}>{label}</AttributeLabel>
      })}
    </MonsterAttributes>
  )
  return octagon
}

/** An index type for the monsterAttribute object. Each object contains values with either a string or a fillProportion type */
type monsterAttributes = {
  [key: string]: string | fillProportions
}
/**
 * This makes 6 Pokemon cards given all the information about any of the 6 Pokemon. Each missing Pokemon attribute will be padded with an empty Object.
 *
 * @param monsters: The Pokemons' attributes. Follows the type monsterAttributes
 *
 * @return mosnterCards: The 6 html Pokemon cards.
 */
const makeMonsters = (monsters: monsterAttributes[]) => {
  // pad Pokemon if they don't exist
  const paddedMonsters = [
    ...monsters,
    ...Array(6 - monsters.length).fill({} as monsterAttributes),
  ]

  const nullCheck = new NullCheck([0, 0, 0, 0, 0, 0, 0, 0])
  const monsterCards = (
    <>
      {paddedMonsters.map((monster, index) => {
        const fillColor =
          colors[nullCheck.makeExist(monster.type, 'string') as string]

        if (monster.name) {
          return (
            <MonsterCard key={shortid.generate()}>
              <MoveSet>
                <MoveName>{monster.moveOne ?? ''}</MoveName>
                <MoveName>{monster.moveTwo ?? ''}</MoveName>
                <MoveName>{monster.moveThree ?? ''}</MoveName>
                <MoveName>{monster.moveFour ?? ''}</MoveName>
              </MoveSet>
              <NameSet>
                <MonsterName>
                  {`${monster.name ?? ''} "${monster.nickname ?? ''}"`}
                </MonsterName>
              </NameSet>
              <MonsterIcon>
                <img src={pikachu} alt='piakchu' />
              </MonsterIcon>
              {makePie(
                nullCheck.makeExist(
                  monster.fillProportions,
                  'fillProportions'
                ) as fillProportions,
                fillColor
              )}
              <Misc>
                <MiscIcon
                  src={
                    sex[nullCheck.makeExist(monster.sex, 'string') as string]
                  }
                  alt='male'
                />
                <MiscIcon
                  src={
                    types[
                      nullCheck.makeExist(monster.hidden, 'string') as string
                    ]
                  }
                  alt='ice'
                />
                <Ability backgroundFill={fillColor}>
                  {monster.ability ?? ''}
                </Ability>
              </Misc>
            </MonsterCard>
          )
        }
        return <EmptyCard key={shortid.generate()}>+</EmptyCard>
      })}
    </>
  )
  return monsterCards
}

/**
//  * @param popup: The state of whether to enable viewing this page.
 * @param blur: The state of whether to blur this page so that window popups can happen.
 */
type props = {
  blur: boolean
}
/**
 * The entire Team dashboard will be produced and returned here. The Team dashboard consists of 6
 * Pokemons' overview data, and an effectiveness typing table. All data are presented in the form of
 * cards. The list of items may be expanded in the future.
 *
 * @type props: Refer to type props
 *
 * @return The entire Team dashboard. If a popup dialog is detected, nothing will be returned.
 */
const Team = ({ blur }: props) => {
  const [teamData, setTeamData] = useState([] as monsterAttributes[])

  useAsync(async () => {
    const asyncTeamData = ((await cache.getItem('teamData')) ??
      []) as monsterAttributes[]
    setTeamData(asyncTeamData)
  }, [])

  // this constant uses placeholder data
  // const gotSomeTeamData: monsterAttributes[] = [
  //   {
  //     name: 'Pikachu',
  //     nickname: "Ash's Bitch",
  //     fillProportions: [1, 1, 1, 0, 1, 0, 0, 0.2],
  //     moveOne: 'Thunder',
  //     moveTwo: 'Thunderbolt',
  //     moveThree: 'Iron Tail',
  //     moveFour: 'Volt Tackle',
  //     ability: 'Lightning Rod',
  //     hidden: 'steel',
  //     type: 'electric',
  //     sex: 'female',
  //   },
  // ]
  // cache.setItem('teamData', gotSomeTeamData)
  // console.log(teamData)

  return (
    <Dashboard blur={blur}>
      <ItemArea>
        <TypeTable>Type</TypeTable>
        {makeMonsters(teamData)}
      </ItemArea>
    </Dashboard>
  )
}

export default memo(Team)

import styled, { css } from 'styled-components'

export const Dashboard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  background-color: #eff0f2;
  padding-top: 40px;
  display: grid;
  grid-template-areas: '. item';
  grid-template-columns: 100px 7fr;
  gap: 100px;
  filter: ${(props: any) => (props.blur ? 'blur(5px)' : 'blur(0px)')};
`

export const ItemArea = styled.div`
  grid-area: item;
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-auto-rows: 200px;
  gap: 20px;
`

export const MonsterCard = styled.div`
  padding: 7px;
  border-radius: 15px;
  background-color: #fcfcfc;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border: none;
  cursor: pointer;
  outline: none;
  display: grid;
  grid-template-areas:
    'image moveset attribute'
    'name name attribute'
    'other other attribute';
  grid-template-rows: minmax(0, 15fr) minmax(0, 3fr) minmax(0, 5fr);
  grid-template-columns: minmax(0, 3fr) minmax(0, 3fr) minmax(0, 4fr);
`

export const MoveSet = styled.div`
  grid-area: moveset;
  position: relative;
  text-align: left;
`

export const MoveName = styled.p`
  margin: 0px;
  font-family: system-ui;
  font-weight: 100;
  font-size: 1.4em;
`

export const MonsterIcon = styled.div`
  grid-area: image;
  position: relative;
  transform: scale(0.7, 0.7);
`

export const NameSet = styled.div`
  grid-area: name;
  justify-self: center;
  position: relative;
  margin: 0px;
  padding: 0px;
  text-align: left;
`

export const MonsterName = styled.p`
  margin: 0px;
  padding: 0px;
  font-family: system-ui;
  font-weight: 100;
  font-size: 1.4em;
`

export const Misc = styled.div`
  grid-area: other;
  display: inline-flex;
  align-items: center;
  position: relative;
  transform: scale(0.6, 0.6);
  transform-origin: 30px;
`

export const MiscIcon = styled.img`
  margin: 0px -4px;
  transform: scale(0.75, 0.75);
`

export const Ability = styled.div`
  padding: 6px 16px;
  margin: 0px 5px;
  font-family: system-ui;
  font-weight: 100;
  font-size: 1.8em;
  white-space: nowrap;
  border-radius: 150px;
  background-color: ${(props: any) => props.backgroundFill || '#EEC8B7'};
`

const PieFonts = css`
  font-family: system-ui;
  font-size: 0.8em;
  font-weight: 100;
  z-index: 10;
`

export const MonsterAttributes = styled.div`
  grid-area: attribute;
  position: relative;
  transform: translate(0, 10px);
`

export const LvlSVG = styled.svg`
  transform: translate(0, 30px) rotate(-112.5deg);
`

export const LvlLabel = styled.div`
  transform: translate(0, -821px);
  ${PieFonts}
`

export const HapSVG = styled.svg`
  transform: translate(2px, -73px) rotate(-67.5deg);
`

export const HapLabel = styled.div`
  transform: translate(45px, -823px);
  ${PieFonts}
`

export const SpaSVG = styled.svg`
  transform: translate(3px, -175px) rotate(-22.5deg);
`

export const SpaLabel = styled.div`
  transform: translate(65px, -793px);
  ${PieFonts}
`

export const SpdSVG = styled.svg`
  transform: translate(2px, -277px) rotate(22.5deg);
`

export const SpdLabel = styled.div`
  transform: translate(45px, -762px);
  ${PieFonts}
`
export const SpeSVG = styled.svg`
  transform: translate(0, -380px) rotate(67.5deg);
`

export const SpeLabel = styled.div`
  transform: translate(0, -766px);
  ${PieFonts}
`

export const DefSVG = styled.svg`
  transform: translate(-2px, -485px) rotate(112.5deg);
`

export const DefLabel = styled.div`
  transform: translate(-45px, -795px);
  ${PieFonts}
`

export const AtkSVG = styled.svg`
  transform: translate(-3px, -591.5px) rotate(157.5deg);
`

export const AtkLabel = styled.div`
  transform: translate(-64px, -860.5px);
  ${PieFonts}
`

export const HpSVG = styled.svg`
  transform: translate(-2px, -698px) rotate(202.5deg);
`

export const HpLabel = styled.div`
  transform: translate(-45px, -925px);
  ${PieFonts}
`

export const Background = styled.circle`
  fill: none;
  stroke: #e2e2e2;
`

export const Fill = styled.circle`
  fill: none;
  stroke: ${(props: any) => props.strokeFill || '#EEC8B7'};
`

export const EmptyCard = styled.button`
  padding: 10px;
  border: 4px dashed #c9c9c9;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 500%;
  font-family: 'Open Sans';
  font-weight: lighter;
  color: #c9c9c9;
  outline: none;
`

export const TypeTable = styled.div`
  grid-row: span 3;
  padding: 10px;
  border-radius: 15px;
  background-color: #fcfcfc;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border: none;
  cursor: pointer;
  outline: none;
`

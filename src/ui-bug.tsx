import { engine, UiDropdown } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity, Position,UiBackgroundProps, Dropdown, Input } from '@dcl/sdk/react-ecs'

export let showTest:boolean = true
let dropdownIndex:number = 0
let dropdownOptions:string[] = ["Select Dropdown", "Index 1", "Index 2"]
let textValue = ''
export function showUITest(value:boolean){
  dropdownIndex = 1
  showTest = value
  textValue = ''
}

let onChange = (value: string) => {
  console.log('onChange', value)
  textValue = value

  onChange = (value: string) => {
    console.log('Changed changed changed', value)
  }
}


export function createUITest(){
  // console.log({ dropdownIndex })
    return (
      <UiEntity key={"dropdown::ui::test"}
        uiTransform={{
          width: '50%',
          height: '80%',
          justifyContent:'center',
          flexDirection:'column',
          alignItems:'center',
          alignContent:'center',
          positionType:'absolute',
          position:{left:'25%', top:'5%'},
          display: showTest ? "flex" :  "none"
        }}
        uiBackground={{color:Color4.Black()}}
      >

    <Dropdown
      options={dropdownOptions}
      selectedIndex={dropdownIndex}
      onChange={selectDropdown}
      fontSize={30}
      uiTransform={{
          width: '50%',
          height: '10%',
      }}
      color={Color4.White()}
    />

    <Input
      uiTransform={{
        width: '50%',
        height: '10%',
      }}
      value={textValue}
      onSubmit={(value) => {
        console.log('onSubmit', value)
      }}
      onChange={onChange}
      fontSize={30}
      color={Color4.White()}
      placeholder="Type here..."
    />


    <UiEntity
      uiTransform={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          height: '10%',
          display: "flex"
      }}
      uiBackground={{color:Color4.Red()}}
      uiText={{textWrap:'nowrap', value:`Index is ${dropdownIndex}`, fontSize:30}}
    />

    <UiEntity
      uiTransform={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          height: '10%',
          margin:{top:"5%"}
      }}
      uiBackground={{color:Color4.Green()}}
      uiText={{textWrap:'nowrap', value:"Close UI", fontSize:30}}
      onMouseDown={()=>{
        showUITest(false)
      }}
    />

          </UiEntity>
    )
}

let lastIndex = dropdownIndex
engine.addSystem(() => {
  for (const [entity] of engine.getEntitiesWith(UiDropdown)) {
    UiDropdown.onChange(entity, value => {
      console.log('OnChange', value?.selectedIndex)
    })
    engine.removeSystem('asd')
  }
}, 1, 'asd')

function selectDropdown(index:number){
  console.log('onChangeasd', index)
  dropdownIndex = index
}
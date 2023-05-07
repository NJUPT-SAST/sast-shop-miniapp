import { View ,Text, Picker ,Image } from "@tarojs/components"
import { Component } from "react"
import arrow from '../../assets/images/arrow.png'
import './picker2.scss'

export default class PagePicker2 extends Component{
    state = {
      selector: ['S', 'M','L','XL','2XL','3XL'],
      selectorChecked: '尺码'
    }
  
    onChange = e => {
      this.setState({
        selectorChecked: this.state.selector[e.detail.value]
      })
    }
  
    onTimeChange = e => {
      this.setState({
        timeSel: e.detail.value
      })
    }
    onDateChange = e => {
      this.setState({
        dateSel: e.detail.value
      })
    }
  
    render () {
      return (
      <View className='picker-box'>
        <Text>尺码</Text>
          <Picker className="picker-item" mode='selector' range={this.state.selector} onChange={this.onChange}>
              <View className='picker'>
                {this.state.selectorChecked}
                <Image className="arrow" src={arrow}></Image>
              </View>
          </Picker>
      </View>
      )
    }
  }

  export {PagePicker2}
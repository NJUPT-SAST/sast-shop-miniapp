import { View ,Text, Picker ,Image } from "@tarojs/components"
import { Component } from "react"
import arrow from '../../assets/images/arrow.png'
import './picker1.scss'

export default class PagePicker extends Component{
    state = {
      selector: ['米其色', '深蓝色'],
      selectorChecked: '类型'
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
        <Text>商品类型</Text>
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

  export {PagePicker}
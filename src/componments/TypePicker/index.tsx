import { View, Text, Picker, Image, CommonEventFunction, PickerSelectorProps } from "@tarojs/components"
import { Component, useState } from "react"
import arrow from '../../assets/images/arrow.png'
import './index.scss'



function PagePicker(props: pickerProps) {
    const Picked=props.pickerConfig.selector[props.pickerConfig.selectorChecked]
    function onChange(e) {
        props.typeSetter(prev => { return { ...prev, selectorChecked: e.detail.value } })
    }   
    return (
        <View className='picker-box'>
            <Text>{props.title}</Text>
            <Picker className="picker-item" mode='selector' range={props.pickerConfig.selector} onChange={onChange}>
                <View className='picker'>
                    {props.pickerConfig.selector[props.pickerConfig.selectorChecked]}
                    <Image className="arrow" src={arrow}></Image>
                </View>
            </Picker>
        </View>
    )
}

export default PagePicker


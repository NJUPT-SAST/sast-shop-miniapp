import { View, Text ,Button , Input ,Radio, Label, RadioGroup} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import PagePicker from './picker1'
import PagePicker2 from './picker2'

export default function OrderForm() {

  useLoad(() => {
    console.log('Page loaded.')
  })
  return (
    <>
      <View className='order-title'>
        <Text className='title-text'>编辑收货详情</Text>
      </View>
      <View className='order-form'>
        <View className='order-box'>
        <View className='form-item'>
          <Text>收货人</Text>
          <Input className='order-input' type='text' placeholder='用户姓名'></Input>
        </View>

        <View className='form-item'>
          <Text>手机号码</Text>
          <Input type='text' placeholder='用户号码'></Input>
        </View>

        <View className='form-item'>
          <Text>用户邮箱</Text>
          <Input type='text' placeholder='用户邮箱'></Input>
        </View>

        {/* <View className='form-item'>
          <Text>商品类型</Text>
          <Input type='text' placeholder='商品类型'></Input>
        </View> */}
        <PagePicker/>

        {/* <View className='form-item'>
          <Text>尺码</Text>
          <Input type='text' placeholder='商品尺码'></Input>
        </View> */}
        <PagePicker2/>

        <View className='form-item'>
          <Text>邮寄</Text>
          <RadioGroup  className='location'>
          <Label>
            <Radio value='是'>是</Radio>
          </Label>
          <Label>
            <Radio value='否'>否</Radio>
          </Label>
          </RadioGroup>
        </View>

        <View className='form-item'>
          <Text>邮寄地址</Text>
          <Input type='text' placeholder='地址'></Input>
        </View>

        <View className='form-item'>
          <Text>购买数量</Text>
          <Input type='text' placeholder='件数选择'></Input>
        </View>
       </View>

      </View>

      <View className='order-price'>
        <View className='good-line'>
          <Text className='good-line-item'>商品金额</Text>
          <Text className='good-price'>￥99.00</Text> 
        </View>
        <View className='send-line'>
          <Text className='send-line-item'>运费</Text>
          <Text className='send-price'>￥0.00</Text> 
        </View>
      </View>

      <View className='Price'>合计: ￥ 99.00</View>

      <Button className='order-button'>提交订单</Button>
    </>
    
  )
}

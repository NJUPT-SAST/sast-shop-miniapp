import { View, Text, Button, Input, Radio, Label, RadioGroup ,Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'
import"./number.scss"
import PagePicker from '../../componments/TypePicker'
import { useState ,useEffect ,useRef} from 'react'
import box from '../../assets/images/Box.jpg'


export default function OrderForm() {

  const [send,setSend]=useState(false)
  const sendPrice=send?12:0
  const [button,setButton]=useState(0)

  const[Num,setNum]=useState(1);
    function add(){
        setNum(Num+1);
    }
    function drease(){
        if(Num>0){
            setNum(Num-1);
        }
    }

    const oneprice=99
    const productPrice=oneprice*Num
    const totalPrice=sendPrice+productPrice

  const [type, setType] = useState({
    selector: ['米其色', '深蓝色'],
    selectorChecked: 0
  })
  const [size,setSize]=useState({
    selector: ['S', 'M','L','XL','2XL','3XL'],
    selectorChecked: 0
  })

  useLoad(() => {
    console.log('Page loaded.')
  })

  const nameRef=useRef('')
  const phoneRef=useRef('')
  const emailRef=useRef('')
  const needPostRef=useRef(0)
  const addressRef=useRef('')

  function btClick(){
    const nameValue = nameRef.current.value
    const phoneValue = phoneRef.current.value
    const emailValue = emailRef.current.value
    const typeValue=type.selector[type.selectorChecked]
    const sizeValue = size.selector[size.selectorChecked]
    const countValue = Num
    const needPostValue = send?1:0
    const addressValue = addressRef.current.value

    const postdata={
      name:nameValue,
      phone:phoneValue,
      email:emailValue,
      type:typeValue,
      size:sizeValue,
      count:countValue,
      needPost:needPostValue,
      postAddress:addressValue,
      productId:1,
    }

    if(nameValue==''||phoneValue==''||emailValue==''||(needPostValue==1&&addressValue=='')){
      Taro.showModal({
        title: '提示',
        content: '请将信息填写完整',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      Taro.request({
        url:'http://127.0.0.1:4523/m1/2655521-0-default/user/order',
        data:postdata,
        method:'POST',
        header:{
          'content-type':'application/json'
        },
        success:(res)=>{
          console.log(res.data)
          
        },
        fail:(err)=>{
          console.log(err)
        },
      })
  }
}
  

  
  return (
    <>
      <View className='order-title'>
        <Image className='title-picture' src={box} ></Image>
        <Text className='title-text'>编辑收货详情</Text>
      </View>
      <View className='order-form'>
        <View className='order-box'>
          <View className='form-item'>
            <Text>收货人</Text>
            <Input  ref={nameRef} className='order-input' type='text' placeholder='用户姓名'></Input>
          </View>

          <View className='form-item'>
            <Text>手机号码</Text>
            <Input ref={phoneRef} type='text' placeholder='用户号码'></Input>
          </View>

          <View className='form-item'>
            <Text>用户邮箱</Text>
            <Input ref={emailRef} type='text' placeholder='用户邮箱'></Input>
          </View>

          
          <PagePicker title='商品类型' typeSetter={setType} pickerConfig={type} />

          <PagePicker title='尺码' typeSetter={setSize} pickerConfig={size} />

          <View className='form-item'>
            <Text>邮寄</Text>
            <RadioGroup ref={needPostRef} className='location'>
              <Label>
                <Radio onClick={()=>{setSend(true)}} checked={send} value='true'>是</Radio>
              </Label>
              <Label>
                <Radio onClick={()=>{setSend(false)}} checked={!send} value='false'>否</Radio>
              </Label>
            </RadioGroup>
          </View>

          {send&&
          <View className='form-item'>
            <Text>邮寄地址</Text>
            <Input ref={addressRef} type='text' placeholder='地址'></Input>
          </View>}

          <View className="picker-box">
            <Text>购买数量</Text>
                <Button className="button1" onClick={()=>drease()}>-</Button>
                    <Text className="number">{Num}</Text>
                <Button className="button2" onClick={()=>add()}>+</Button>
          </View>
          

        </View>

      </View>
      <View className='order-price'>
        <View className='good-line'>
          <Text className='good-line-item'>商品金额</Text>
          <Text className='good-price'>￥{productPrice}</Text>
        </View>
        <View className='send-line'>
          <Text className='send-line-item'>运费</Text>
          <Text className='send-price'>￥{sendPrice}</Text>
        </View>
      </View>

      <View className='Price'>
        <Text className='Price-txet'>合计: ￥{totalPrice}</Text>
        <Button onClick={btClick} className='order-button'>提交订单</Button>
      </View>
    </>

  )
}

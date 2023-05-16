import { View, Text, Button, Input, Radio, Label, RadioGroup ,Image } from '@tarojs/components'
import { useLoad ,getCurrentInstance} from '@tarojs/taro'
import Taro from '@tarojs/taro'
import './index.scss'
import"./number.scss"
import PagePicker from '../../componments/TypePicker'
import { useState ,useEffect ,useRef} from 'react'
import box from '../../assets/images/Box.jpg'


export default function OrderForm() {

  const [send,setSend]=useState(false)
  const sendPrice=send?12:0

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
    // console.log('Page loaded.')
  })

  const [nameValue,setNameValue]=useState('')
  const [phoneValue,setPhoneValue]=useState('')
  const [addressValue,setAddressValue]=useState('')
  const [emailValue,setEmailValue]=useState('')
 
  

  function btClick(){
    
    const typeValue=type.selector[type.selectorChecked]
    const sizeValue = size.selector[size.selectorChecked]
    const countValue = Num
    const needPostValue = send?1:0
    const id = getCurrentInstance().router.params.id

    const postdata={
      name:nameValue,
      phone:phoneValue,
      email:emailValue,
      type:typeValue,
      size:sizeValue,
      count:countValue,
      needPost:needPostValue,
      postAddress:addressValue,
      productId:id,
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
      //创建表单
      Taro.request({
        url:'https://wechatpayment.sast.fun/user/order',
        data:postdata,
        method:'POST',
        header:{
          'content-type':'application/json',
          // 'TOKEN': code
        },
        success:(res)=>{
          console.log(res.data)
        },
        fail:(err)=>{
          console.log(err)
        },
      })

      //保存一份信息
      Taro.request({
        url:'https://wechatpayment.sast.fun/user/information',
        data:{
          name:nameValue,
          phone:phoneValue,
          postAddress:addressValue,
        },
        method:'POST',
        header:{
          'content-type':'application/json',
          // 'TOKEN': code
        },
        success:(res)=>{
          console.log(res.data)
        },
        fail:(err)=>{
          console.log(err)
        },
      })

      //将用户的信息进行填写
      Taro.request({
        url:'https://wechatpayment.sast.fun/user/information',
                method:'GET',
                header:{
                  'content-type':'application/json',
                  // 'TOKEN': code
                },
                success:(res)=>{
                  console.log(res.data)
                  setNameValue(res.data.name)
                  setPhoneValue(res.data.phone)
                  setAddressValue(res.data.postAddress)
                },
                fail:(err)=>{
                  console.log(err)
                },
      })

      
      //发起支付
      Taro.request({
        url:'https://wechatpayment.sast.fun/user/pay',
        data:{
          id:1
        },
        method:'POST',
        header:{
          'content-type':'application/json'
          // 'TOKEN': code
        },
        success:(res)=>{
          console.log(res.data)
          Taro.requestPayment({
            timeStamp:res.data.timeStamp,
            nonceStr:res.data.nonceStr,
            package:res.data.package,
            signType:res.data.signType,
            paySign:res.data.paySign,
            success:(res)=>{
              console.log(res)
            },
            fail:(err)=>{
              console.log(err)
            }
          })
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
            <Input value={nameValue} onInput={(e)=>{setNameValue(e.detail.value)}} className='order-input' type='text' placeholder='用户姓名'></Input>
          </View>

          <View className='form-item'>
            <Text>手机号码</Text>
            <Input value={phoneValue} onInput={(e)=>{setPhoneValue(e.detail.value)}} type='text' placeholder='用户号码'></Input>
          </View>

          <View className='form-item'>
            <Text>用户邮箱</Text>
            <Input onInput={(e)=>{setEmailValue(e.detail.value)}} type='text' placeholder='用户邮箱'></Input>
          </View>

          
          <PagePicker title='商品类型' typeSetter={setType} pickerConfig={type} />

          <PagePicker title='尺码' typeSetter={setSize} pickerConfig={size} />

          <View className='form-item'>
            <Text>邮寄</Text>
            <RadioGroup className='location'>
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
            <Input value={addressValue} onInput={(e)=>{setAddressValue(e.detail.value)}} type='text' placeholder='地址'></Input>
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

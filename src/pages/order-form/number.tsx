import { View ,Text, Button} from "@tarojs/components";
import { useState } from "react";
import"./number.scss"


export default function Number(){
    const[Num,setNum]=useState(1);
    function add(){
        setNum(Num+1);
    }
    function drease(){
        if(Num>0){
            setNum(Num-1);
        }
    }

    return(
        <>
        <View className="picker-box">
            <Text>购买数量</Text>
                <Button className="button1" onClick={()=>drease()}>-</Button>
                    <Text className="number">{Num}</Text>
                <Button className="button2" onClick={()=>add()}>+</Button>
        </View>
        </>
    )
}

export{Number}
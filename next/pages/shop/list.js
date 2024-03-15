import { useState, useEffect } from 'react'
import shopData from '@/data/member.json'
//得到全部商品的data

const demoShopInfo = [
    {
      id:"",
      name:"",
      account:"",
      password:"",
      phone:"",
      email:"",
      address:"",
      birthday:"",
      birthday_month:"",
      created_at:"",
      gender:"",
      pic:"",
      level_point:"0",
      google_uid:"",
      shop_name:"",
      shop_site:"",
      shop_cover:"",
      shop_info:"",
      shop_valid:"0",
    }
  ]

export default function ShopList() {
    // 注意1: 初始值至少要給空陣列
    // 注意2: 應用程式執行期間，要保持狀態的資料類型一致
    // 建議在開發時，使用陣列樣貌的範例資料，或使用註解
  const [shops, setShops] = useState([])

  return (
    <div>
      
    </div>
  )
}

import { useState } from 'react'
import type { CartItem } from './type/cartItem.ts'
import type { Item } from './type/item.ts'
import './App.css'

const items: Item[] = [
  { id: '0001', name: '商品001', price: 1000, description: '商品001の説明です。' },
  { id: '0002', name: '商品002', price: 2000, description: '商品002の説明です。' },
  { id: '0003', name: '商品003', price: 3000, description: '商品003の説明です。' },
  { id: '0004', name: '商品004', price: 4000, description: '商品004の説明です。' },
  { id: '0005', name: '商品005', price: 1000, description: '商品005の説明です。' },
  { id: '0006', name: '商品006', price: 2000, description: '商品006の説明です。' },
  { id: '0007', name: '商品007', price: 3000, description: '商品007の説明です。' },
  { id: '0008', name: '商品008', price: 1000000, description: '商品008の説明です。' },
]

function App() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalPrice: number = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  // 商品一覧の商品追加ボタン押下処理
  const addCart = ((newItem: Item) => {
    setCartItems((currentItems) => {

      // 選択した商品と同じidの商品が買い物かごに存在するかチェック
      const existsItem = currentItems.find((item) => item.id === newItem.id);

      // 選択した商品と同じidの商品が買い物かごにあればcountを+1
      if (existsItem) {
        return currentItems.map((item) =>
          item.id === newItem.id ? { ...item, count: item.count + 1 } : item
        );
      }

      // 選択した商品が買い物かごになければ新規追加
      return [...currentItems, { id: newItem.id, name: newItem.name, price: newItem.price, count: 1 }];
    });
  });

  // 買い物かご内のーボタン押下処理
  const minusCount = ((itemId: string) => {
    setCartItems((currentItems) => {
      return currentItems.map((item) =>
        item.id === itemId ? { ...item, count: item.count - 1 } : item
      ).filter((item) => item.count > 0)
    });
  });

  // 買い物かご内の＋ボタン押下処理
  const addCount = ((itemId: string) => {
    setCartItems((currentItems) => {
      return currentItems.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1 } : item
      )
    });
  });

  return (
    <>
      <section>
        <div className="app-header">
          <h1>904_Shopping_App</h1>
          <p>React学習用のショッピングアプリケーションです。</p>
        </div>
      </section>
      <section>
        <div className="app-content">
          <div className="item-list">
            <h2>商品一覧</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>価格：{item.price.toLocaleString('ja-JP')}円</p>
                  <p>{item.description}</p>
                  <button onClick={() => addCart(item)}>買い物かごに追加</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart">
            <h2>買い物かご</h2>
            <ul>
              {cartItems.length === 0 ? (<li>商品なし</li>) : (
                cartItems.map((item) => (
                  <li key={item.id}>
                    <h3>{item.name}</h3>
                    <p>価格：{item.price.toLocaleString('ja-JP')}円</p>
                    <p>数量：{item.count.toLocaleString('ja-JP')}</p>
                    <div className="handle-count">
                      <button className="count-minus" onClick={() => minusCount(item.id)}>ー</button>
                      <button className="count-plus" onClick={() => addCount(item.id)}>＋</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="totalPrice">
              <p>合計金額：{totalPrice.toLocaleString('ja-JP')}円</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App

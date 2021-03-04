import { useArray } from "../../utils"
interface User {

}

export const TsReactTest = () => {
  const persons: { name: string; age: number; }[] = [
    { name: 'jack', age: 25 },
    { name: 'ma', age: 22 }
  ]

  const { value, add, removeIndex, clear } = useArray(persons)

  return (
    <div>
      <button onClick={() => add({ name: 'aa', age: 20 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      {
        value.map((person, index) => {
          return (
            <div key={index}>
              <span>{index}</span>
              <span>{person.name}</span>
              <span>{person.age}</span>
            </div>
          )
        })
      }
    </div>
  )
}
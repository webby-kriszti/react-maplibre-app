import { useBearStore } from '@renderer/store/BearStore'
import { ReactElement } from 'react'

const BearBox = (): ReactElement => {
  // const bears = useBearStore((state) => state.bears);
  // const increasePopulation = useBearStore((state) => state.increasePopulation);
  // const removeAllBears = useBearStore((state) => state.removeAllBears);
  const { bears, increasePopulation, removeAllBears } = useBearStore()

  // const fish = useFoodStore((state) => state.fish);

  return (
    <div className="box">
      <h1>Bear Box</h1>
      <p>bears: {bears}</p>
      <div>
        <button onClick={increasePopulation}>add bear</button>
        <button onClick={removeAllBears}>remove all bears</button>
      </div>
    </div>
  )
}

export default BearBox

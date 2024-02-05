'use client'
import React from 'react'
import { increment, decrement } from '@/redux/features/counterSlice';
import { useAppSelector, useAppDispatch, useAppStore } from '@/redux/hooks';
import { Button } from 'primereact/button';

function TestRoute() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => state.counter.value);
  return (
    <div>
      route child
      <p>{value}</p>
      <div className="card">
        <div className="flex flex-wrap gap-2">
          <Button id="" label="Increment" severity="info" onClick={() => dispatch(increment())} />
          {/* <Button onClick={pauseVideo} label="Pause" severity="warning" /> */}
          <Button id="stop-button" label="Decrement" severity="info" onClick={() => dispatch(decrement())} />
        </div>
      </div>

    </div>
  )
}

export default TestRoute
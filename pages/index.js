// import styles from '@/styles/Home.module.css';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME } from '../redux/reducers/profileSlice';

function DisplayName() {
  const { name,  } = useSelector((state) => state.profile);
  console.log(name, "name")
  return (
    <h1> I am {name} !!</h1>
  );
}
export default function Home() {
  const dispatch = useDispatch();
  function submitName(value) {
    dispatch(SET_NAME(value));
  }
  return (
    <>
      <main>
        <input placeholder='enter name' onChange={(e) => submitName(e.target.value)} />
        <button >Enter name</button>
        <DisplayName />
      </main>
    </>
  );
}
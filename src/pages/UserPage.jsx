import React from 'react';
import { useLocation } from 'react-router-dom';
import Main from '../components/Main';

export default function UserPage() {
  const {
    state: { user },
  } = useLocation();
  console.log(user);

  return (
    <>
      <section className="px-4">
        <div className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <img
            src={user.profile_img}
            alt={user.nick_name}
            className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold md:text-left">
              {user.nick_name}
            </h1>
            {/* <button className='flex'>커미션</button> */}
          </div>
        </div>
      </section>
      <Main user={user} />
    </>
  );
}

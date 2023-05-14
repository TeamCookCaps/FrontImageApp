import React, {Fragment, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { removeAllImage } from '../api/trash';
import { removeCloudinary } from '../api/trash';
import { restoreAllImage } from '../api/trash';

export default function TrashModal({isOpen, setIsOpen, trashImageInfo}) {

    const [removeLoading, setRemoveLoading] = useState(false)
    const [restoreLoading, setRestoreLoading] = useState(false)

    const removeImage = async() => {
        setRemoveLoading(true);
        try {
          const res1 = await removeAllImage(trashImageInfo?.id)
          console.log(res1);
          const res2 = await removeCloudinary(trashImageInfo?.image_url.substring(trashImageInfo?.image_url.lastIndexOf('/')+1).split('.')[0])
          console.log(res2);
        } catch(error) {
          console.error(error);
        } finally {
          setIsOpen(false);
          setRemoveLoading(false);
          window.location.reload();
        }
      }


      const restoreImage = async () => {
        setRestoreLoading(true);
        try {
          const res = await restoreAllImage(trashImageInfo?.id);
    
          // 복구 시킬 사진 로컬스토리지에서 모두 삭제
          for (let key in localStorage) {
            if (key.includes('photo-deleted-')) {
              localStorage.removeItem(key);
            }
          }
    
          console.log(res);
        } catch (error) {
          console.error(error);
        } finally {
          setIsOpen(false);
          setRestoreLoading(false);
          window.location.reload();
        }
      };

    return (
        <>
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
    
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div> */}
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 sm:pb-4">
                            선택한 사진을 어떻게 하시겠습니까?
                          </Dialog.Title>
                          <div className="mt-2">
                            <img src={trashImageInfo?.image_url} />
                            <p className="sm:pt-4">
                                <span className='text-sm  text-gray-500'>width : </span>
                                <span className='text-md text-gray-600'>{trashImageInfo?.image_width}</span>
                            </p>
                            <p>
                                <span className='text-sm  text-gray-500'>height : </span>
                                <span className='text-md text-gray-600'>{trashImageInfo?.image_height}</span>
                            </p>       
                            <p>
                                <span className='text-sm  text-gray-500'>업로드 날짜 : </span>
                                <span className='text-md text-gray-600'>{trashImageInfo?.image_date}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:ml-2 sm:w-auto"
                        onClick={() => setIsOpen(false)}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-2 sm:w-auto ${removeLoading ? "cursor-not-allowed opacity-25" : ""}`}
                        onClick={() => removeImage()}
                        disabled={removeLoading || restoreLoading}
                      >
                        {removeLoading ? <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div> : "삭제"}
                      </button>
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-2 sm:w-auto ${restoreLoading ? "cursor-not-allowed opacity-25" : ""}`}
                        onClick={() => restoreImage()}
                        disabled={removeLoading || restoreLoading}
                      >
                        {restoreLoading ? <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div> : "복구"}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        </>
    )
}
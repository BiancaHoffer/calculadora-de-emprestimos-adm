import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Button } from './Button';

import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  result1: string[];
  result2: string;
  copyCheck: boolean;
  copyCheck2: boolean;
  setCopyCheck2: Dispatch<SetStateAction<boolean>>;
  copyResult: (option: number) => void;
}

export function Modal({
  isOpen,
  setIsOpen,
  result1,
  result2,
  copyCheck,
  copyCheck2,
  copyResult,
}: ModalProps) {
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl flex flex-col items-start bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between w-full items-center mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold  text-gray-900"
                    >
                      Cronograma de Pagamento
                    </Dialog.Title>
                    <button onClick={closeModal} className="cursor-pointer text-xl p-2 text-zinc-500">
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="shadow-inner rounded-lg p-6 text-sm text-gray-500 flex items-start gap-2 justify-between w-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="self-start mb-2 text-center">{result2}</p>

                        {result1.map((result: any, index: any) => {
                          return (
                            <div key={index}>{result}</div>
                          )
                        })}
                      </div>
                      <button className="text-xl" onClick={() => copyResult(1)}>
                        {copyCheck ? <LuCopyCheck /> : <LuCopy />}
                      </button>
                    </div>
                    <p className='text-zinc-400 text-base text-center py-4'>OU</p>
                    <div className="items-start gap-2 justify-between shadow-inner rounded-lg p-6 text-sm text-gray-500 flex w-full">
                      <div>
                        <p className="text-sm text-gray-500">
                          {result2}
                        </p>
                      </div>
                      <button className="text-xl" onClick={() => copyResult(2)}>
                        {copyCheck2 ? <LuCopyCheck /> : <LuCopy />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      title="Fechar"
                      type="button"
                      onClick={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
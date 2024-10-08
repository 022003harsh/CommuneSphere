/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { getEventId } from '@/actions/event.action';
import { useDisplayCurrentYear } from '@/hooks/use-display-data';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OnClickEventView = () => {
    const clickedViewId = useSelector((state: any) => state.id);
    const [eventData, setEventData] = useState<any>(null);


    useEffect(() => {
        async function fetchData() {
            const data = await getEventId(clickedViewId);
            setEventData(data);
        }
        fetchData();
    }, [clickedViewId]);

    return (
        eventData ? (
            <div className='mt-4 w-full rounded-[7.54px] bg-white p-4'>
                <div className='flex w-full justify-end'>
                    {/* pencil icons */}
                </div>
                <div className='flex w-full gap-4 bg-white relative'>
                    <Image src="/events-thumbnail.png" alt="intro" width={400} height={100} className="w-full h-28" />
                    <p className='absolute bottom-2 left-2 bg-white opacity-85 text-black font-medium rounded-md px-2'>{eventData.name}</p>
                </div>
                <div className='text-xs my-5'>
                    Created at 4/03/2024
                </div>
                <div className='mt-4 grid w-full grid-cols-3 gap-3'>
                    <div className='flex flex-col items-start justify-start border-r-2'>
                        <p>Event Date</p>
                        <p className='text-xl font-bold'>
                            4th April
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p>Time</p>
                        <p className='text-xl font-bold'>
                            10:00 AM
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center border-l-2'>
                        <p>Mode</p>
                        <p className='text-xl font-bold'>
                            Offline
                        </p>
                    </div>
                </div>
                <div className='mt-3 text-lg font-semibold'>
                    Details
                </div>

                <div className='mt-1 flex flex-col w-full gap-4'>
                    <div className='w-full flex gap-1 justify-between'>
                        <p className='font-medium'>Location</p>
                        <p>{eventData.location}</p>
                    </div>
                    <div className='w-full flex gap-1 justify-between'>
                        <p className='font-medium'>Duration</p>
                        <p>{eventData.duration}h</p>
                    </div>
                    <div className='w-full flex gap-1 justify-between'>
                        <p className='font-medium'>Target Year</p>
                        <p>{eventData.target_year ? useDisplayCurrentYear(eventData.target_year) : ''}</p>
                    </div>
                    <div className='w-full flex gap-1 justify-between'>
                        <p className='font-medium'>Domain</p>
                        <p>Creative</p>
                    </div>



                    {/* <div>{eventData.name}</div>
                    <div>{eventData.date}</div>
                    <div>{eventData.createdAt}</div>
                    <div>{eventData.location}</div>
                    <div>{eventData.duration}</div>
                    <div>{eventData.target_year}</div>
                    <div>{eventData.actual_participants}</div>
                    <div>{eventData.expected_participants}</div>
                    <div>{eventData.date}</div> */}
                </div>

                <p className='mt-3 text-lg font-semibold'>
                    Participants
                </p>

                <div className='mt-1 grid w-full grid-cols-2 gap-4 text-sm font-medium'>
                    <div className='flex flex-col items-start justify-start border-r-2 '>
                        <p>Actual Participants</p>
                        <p className='text-lg font-bold'>
                            {eventData.actual_participants}
                        </p>
                    </div>
                    <div className='flex flex-col items-start justify-start'>
                        <p>Expected Participants</p>
                        <p className='text-lg font-bold'>
                            {eventData.expected_participants}
                        </p>
                    </div>
                </div>

                <div className='mt-3 flex flex-col w-full gap-4'>
                    <div className='w-full flex gap-1 justify-between'>
                        <p className='font-medium'>Sponsors</p>
                        <p className='bg-greyTab p-1 text-xs rounded-lg'>Redbull</p>
                    </div>
                </div>

                <div className='flex justify-between items-center mt-3'>
                    <p className='text-sm font-medium'>Drive Link</p>
                    <div className='w-[70%] rounded-sm border-[1px] py-1 pl-3 text-sm font-medium h-8'>
                        <p>
                            {eventData.thumbnail ? eventData.thumbnail : ''}
                        </p>
                    </div>
                </div>
            </div>
        ) : <div className='mt-2 flex h-[40vh] w-full items-center justify-center rounded-[7.54px] bg-white p-4'>
            <p className='text-gray-500'>Select event to view details</p>
        </div>
    );
}

export default OnClickEventView;

import Find from  '../../assets/find.png';
import RealTime from  '../../assets/realtime.png';
import Verify from  '../../assets/verify.png';

function About(){
    return(
        <div className="pt-8 ph-16 px-8 text-center bg-gray-50">
            <h1 className='text-5xl font-bold mb-12'
            >
                <span  className='text-gray-900'>Mine</span>
                <span className='text-blue-600'>Queue</span>
            </h1>
            <div className=' grid grid-cols-1 md:grid-cols-3 gap-6 bg- p-8 '>
    
            <div className='border border-black shadow-sm rounded-xl hover:shadow-lg transition'>
                    <img className='h-20 w-20 mx-auto object-contain mb-4 '
                        src={Verify} 
                        alt="VerifyPage" 
                />
                <h3 className='text-xl font-bold text-blue-900 mb-3'>Verified Doctors</h3>
                <p className='text-gray-600 text-base leading-relaxed'>Every doctor is reviewed and approved before appearing on the platform — so you always know who you're booking with.</p>
        </div>
                <div className='border border-black shadow-sm rounded-xl hover:shadow-lg transition'>
                    <img className='h-20 w-20 mx-auto object-contain mb-4' 
                        src={RealTime} 
                        alt="RealTimePage" 
                />
                <h3 className='text-xl font-bold text-blue-900 mb-3'>Real-Time Slots</h3>
                <p className='text-gray-600 text-base leading-relaxed'>No outdated schedules. The slots you see are live and available — book with confidence, every time.</p>
         </div>
                <div className='border border-black shadow-sm rounded-xl hover:shadow-lg transition'>
                    <img className='h-20 w-20 mx-auto object-contain mb-4'
                            src={Find} 
                            alt="FindPage" 
                />
                <h3 className='text-xl font-bold text-blue-900 mb-3'>Find Nearby</h3>
                <p className='text-gray-600 text-base leading-relaxed'>Search hospitals and doctors by your state and city — care that's close to you, made easy to find.</p>
                </div>
            </div>
        </div>
    )
}

export default About;
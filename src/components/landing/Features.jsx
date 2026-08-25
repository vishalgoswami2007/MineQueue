import { Zap, Lock, Smartphone, Users, Bell, LayoutDashboard } from 'lucide-react';


function Features(){
   return ( 
    <div   id="features" className="py-20  px-8 text-center bg-gray-50 ">
        <h1 className="text-black text-5xl font-bold">
            What Makes <span className="text-blue-600">MineQueue</span> Different
        </h1>
            
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-6 bg- p-8 '>

        <div className='border border-black bg-gray-100 shadow-sm rounded-xl hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300' >
            <Zap size={32} className="text-blue-600" />
            <h3 className='text-extrabold text-2xl text-gray-900'>Real-Time Availability</h3>
            <p className='text-black'>See only the slots that are truly open — no outdated schedules, no surprises.</p>
        </div>
        <div className='border border-black shadow-sm bg-gray-100 rounded-xl hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300'>
            <Lock size={32} className="text-blue-600" />
            <h3 className='text-extrabold text-2xl text-gray-900'>Secure & Private</h3>
            <p className='text-black'>Your data is encrypted and protected — every account is safe by default.</p>
        </div>
        <div className='border border-black shadow-sm bg-gray-100 rounded-xl hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300'>
            <Smartphone size={32} className="text-blue-600" />
            <h3 className='text-extrabold text-2xl text-gray-900'>Quick OTP Login</h3>
            <p className='text-black'>Skip the passwords. Log in instantly with a one-time code sent to you.</p>
        </div>
        <div className='border border-black shadow-sm  bg-gray-100 rounded-xl hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300'>
            <Users size={32} className="text-blue-600" />
            <h3 className='text-extrabold text-2xl text-gray-900'>For Patients & Doctors</h3>
            <p className='text-black'>Whether you're booking a visit or managing your schedule — MineQueue works for you.</p>
        </div>
        <div className='border border-black shadow-sm bg-gray-100 rounded-xl hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300'>
            <Bell size={32} className="text-blue-600" />
            <h3 className='text-extrabold text-2xl text-gray-900'>Instant Notifications</h3>
            <p className='text-black'>Get confirmations and reminders — never miss or double-book an appointment again.</p>
        </div>
        <div className='border border-black shadow-sm bg-gray-100 rounded-xl hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300'>
            <LayoutDashboard size={32} className="text-blue-600" />
            <h3 className='text-extrabold text-2xl text-gray-900'>Manage Everything Easily</h3>
            <p className='text-black'>Track your appointment history, manage cancellations, and reschedule in seconds.</p>
        </div>
        </div>
    </div>
    )
}

export default Features;

import Navbar from "@/components/Navbar";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <div className='flex flex-col min-h-screen'>
  
      <Navbar></Navbar>
      <div id='frontpage' className="w-full h-full fixed" ></div>
      {children}



    </div>


  );
}

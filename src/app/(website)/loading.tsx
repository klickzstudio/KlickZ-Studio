export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EE]/60 backdrop-blur-md px-6">
      {/* Simple, elegant spinner */}
      <div className="w-10 h-10 border-2 border-[#C9A96E]/20 border-t-[#C9A96E] rounded-full animate-spin" />
    </div>
  )
}

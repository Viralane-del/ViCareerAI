import Sidebar from "@/components/layout/Sidebar";
import BottomNavBar from "@/components/layout/BottomNavBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Sidebar>{children}</Sidebar>
            <BottomNavBar />
        </>
    );
}

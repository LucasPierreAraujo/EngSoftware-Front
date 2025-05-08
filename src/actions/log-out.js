export async function logOut() {
    const response = await authService.logout();
    if (response.success) {
        redirect("/login");
    }
}   

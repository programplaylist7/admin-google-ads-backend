export const logout = (req, res) => {
  try {
    
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
    
  } catch (err) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
export async function fetchCreateProgram(programData) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(programData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || 'Failed to create program');
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
      message: data.message || 'Program created successfully'
    };
  } catch (error) {
    console.error('Error in fetchCreateProgram:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while creating the program'
    };
  }
}

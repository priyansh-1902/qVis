import matplotlib.pyplot as plt

def latex_to_transparent_image(latex_code, output_image_path):
    # Create a figure
    fig, ax = plt.subplots()

    # Disable the axis
    ax.axis("off")

    # Set a transparent background
    fig.patch.set_alpha(0)

    # Render LaTeX code
    ax.text(0.5, 0.5, f"${latex_code}$", size=250, ha="center", va="center", color="black", alpha=0.5)

    # Save the figure with a transparent background
    plt.savefig(output_image_path, transparent=True, bbox_inches="tight", pad_inches=0)

if __name__ == "__main__":
    # Provide your LaTeX code here
    latex_code = r'|\psi(t)|^2'

    # Output image path
    output_image_path = "../frontend/src/graphingComponents/psi_squared.png"

    # Convert LaTeX code to a transparent image
    latex_to_transparent_image(latex_code, output_image_path)

    print(f"Transparent LaTeX image saved as '{output_image_path}'.")

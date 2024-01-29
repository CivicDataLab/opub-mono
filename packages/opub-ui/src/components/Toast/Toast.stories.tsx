import { Button } from "../Button";
import { toast } from "./Toast";

/**
 * A succinct message that is displayed temporarily.
 *
 * Reference: https://ui.shadcn.com/docs/components/sonner
 */
export const Default = {
  render: () => {
    return (
      <>
        <Button
          onClick={() => {
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
          }}
        >
          Trigger Toast
        </Button>
      </>
    );
  },
  args: {},
};

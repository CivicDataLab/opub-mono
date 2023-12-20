import { Button } from '../../src/components/Button';
import { useToast } from '../../src/components/Toast';
import tokens from '../../styles/tokens.json';

export const TokenTable = () => {
  const colors = { ...tokens.collections[0].modes[0].variables };
  const { toast } = useToast();

  function copyToClipboard(text: string) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

  return (
    <div className="relative overflow-x-auto shadow-basicMd sm:rounded-4">
      <table className="w-full text-100 text-left rtl:text-right text-textSubdued">
        <thead className="text-textDefault uppercase bg-surfaceSelected">
          <tr>
            <th scope="col" className="px-6 py-3">
              token
            </th>
            <th scope="col" className="px-6 py-3">
              value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(colors).map((row) => {
            let bgColor, name;
            if (typeof row.value === 'object') {
              const converted = row.value.name.split('/').join('-');
              bgColor = `var(--${converted})`;
              name = row.value.name;
            } else {
              bgColor = row.value;
              name = row.value;
            }
            return (
              <tr
                key={row.name}
                className="odd:bg-surfaceDefault even:bg-surfaceSubdued"
              >
                <td className="px-6 py-4">
                  <Button
                    onClick={() => {
                      const converted = row.name.split('/').join('-');
                      copyToClipboard(`var(--${converted})`);
                      toast({
                        title: `copied ${row.name} as css variable`,
                      });
                    }}
                    kind="tertiary"
                  >
                    {row.name}
                  </Button>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: bgColor }}
                    aria-hidden="true"
                  />
                  <span>{name}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

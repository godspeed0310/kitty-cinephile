type Props = Readonly<{
  label: string;
  value: string;
}>;

const MetadataContent = ({ label, value }: Props) => {
  return (
    <p className="text-sm">
      <strong>{label}</strong>:{" "}
      <span className="text-muted-foreground">{value}</span>
    </p>
  );
};

export default MetadataContent;

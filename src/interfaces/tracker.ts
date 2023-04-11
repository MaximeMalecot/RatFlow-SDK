export interface UseGenericTrackerProps {
    tag: string;
    type: string;
    cb?: (data: any) => void;
}

export type UseTrackerProps = Pick<UseGenericTrackerProps, "tag">;

export interface TypeMappingInterface {
    [key: string]: string;
}
